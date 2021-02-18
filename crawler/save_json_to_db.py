import json
import datetime
import re
import os
import django
import sys
from django.conf import settings

fileName = "./yes24_2020_1028_0826_33.json"

sys.path.append("/Users/canine/Documents/dev/sneak_proj/")
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
    for key, value in datas.items():
        title = value["title"]
        author = value["author"]
        publisher = value["publisher"]
        publish_date = make_datetime_from_string(value["publish_date"])
        right_price = make_right_price(value["sales_price"])
        sales_price = int(right_price * 0.9)
        isbn = make_integer_from_string(value["isbn"])
        url = value["url"]
        page = make_integer_from_string(value["page"])
        tags = value["tags"]

        rank = value["rank"]
        sales_point = make_integer_from_string(value["selling_point"])

        # 임시로 yes24로 등록(크롤러 업데이트 후 다음 코드로 변경 예정)
        # market = value["market"]
        market = "yes24"

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

        book_models.MetaData.objects.create(
            market=market, rank=rank, sales_point=sales_point, book=book
        )


if __name__ == "__main__":
    with open(fileName, encoding="utf-8") as json_file:
        json_data = json.load(json_file)
        save_data(json_data)