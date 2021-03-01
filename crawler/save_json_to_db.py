import json
import datetime
import re
import os
import django
import sys
from django.conf import settings
from pathlib import Path


fileName = "./" + str(input())

sys.path.append(str(Path(__file__).resolve().parent.parent))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()
from books import models as book_models


def print_data(datas):
    for key, value in datas.items():
        print(key)
        print(value)


def make_integer_from_string(string_data):
    print(string_data)
    if str(type(string_data)) == "<class 'str'>":
        try:
            return int(re.findall("\d+", string_data)[0])
        except:
            return -1
    return -1


def make_datetime_from_string(string_data):
    year = make_integer_from_string(re.findall("\d+년", string_data)[0])
    month = make_integer_from_string(re.findall("\d+월", string_data)[0])

    return datetime.datetime(year=year, month=month, day=1)


def make_right_price(sales_price):
    sales_price = int(sales_price.replace(",", ""))
    return sales_price + sales_price * 0.1


def make_nospace_string(string_data):
    return string_data.replace(" ", "")


def save_data(datas):
    # datetime 계산용
    now_datetime = datetime.datetime.now()
    start_datetime = now_datetime - datetime.timedelta(
        hours=now_datetime.hour,
        minutes=now_datetime.minute,
        seconds=now_datetime.second,
    )

    for key, value in datas.items():
        title = value["title"]
        author = value["author"]
        publisher = value["publisher"]
        publish_date = make_datetime_from_string(value["publish_date"])
        right_price = value["right_price"]
        sales_price = value["sales_price"]
        isbn = value["isbn"]
        url = value["url"]
        page = value["page"]
        tags = value["tags"]
        rank = value["rank"]
        sales_point = value["sales_point"]

        # 임시로 yes24로 등록(크롤러 업데이트 후 다음 코드로 변경 예정)
        # market = value["market"]
        market = "yes24"

        try:
            book = book_models.Book.objects.get(isbn=isbn)
            print("이미 등록된 책이므로 DB 등록을 넘어갑니다.")
        except:
            book = book_models.Book.objects.create(
                title=title,
                author=author,
                publisher=publisher,
                publish_date=publish_date,
                right_price=right_price,
                sales_price=sales_price,
                isbn=isbn,
                url=url,
                page=page,
            )

            for tag in tags:
                book.tags.add(tag)

            print("새 책의 DB 등록을 마쳤습니다.")

        if book is not None:
            try:
                if (
                    book_models.MetaData.objects.filter(
                        book=book,
                        created_at__range=(start_datetime, datetime.datetime.now()),
                    )[0].created_at
                    > start_datetime
                ):
                    print("오늘 등록된 Metadata이므로 DB에 등록하지 않습니다.")
            except:
                print("이전에 등록된 Metadata가 없으므로 DB에 등록합니다.")
                book_models.MetaData.objects.create(
                    market=market, rank=rank, sales_point=sales_point, book=book
                )
        else:
            print("책 정보가 없어 MetaData를 DB에 등록할 수 없습니다.")


if __name__ == "__main__":
    with open(fileName, encoding="utf-8") as json_file:
        json_data = json.load(json_file)
        save_data(json_data)
