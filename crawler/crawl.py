import requests
import pprint
from bs4 import BeautifulSoup
import json
import os
import re
import time
from datetime import datetime

# from books.models import Book

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
pp = pprint.PrettyPrinter(indent=4, sort_dicts=False)
MAX_PAGE = 30
END_NUMBER = MAX_PAGE * 20 + 1


def crawl600BookData():
    """ init """
    temp_data = {}
    QUERY_SET = {
        "title": "div.goods_info > div.goods_name > a",
        "price": "div.goods_price > em.yes_b",
        "author": "span.goods_auth",
        "publisher": "span.goods_pub",
        "date_of_publish": "span.goods_date",
    }
    """ make dummy """
    for info_number in range(1, END_NUMBER):
        bookinfo_key = "bookinfo" + str(info_number)
        temp_data[bookinfo_key] = {}
    """ crawl and save data """
    start = time.time()  # timer
    for page in range(1, MAX_PAGE + 1):
        """ crawl 20 list """
        req = requests.get(
            "http://www.yes24.com/24/Category/More/001001003?ElemNo=104&ElemSeq=7&PageNumber="
            + str(page)
        )
        html = req.text
        soup = BeautifulSoup(html, "lxml")
        url_list = []  # page url list

        for key, value in QUERY_SET.items():
            suffix_info_number = (page - 1) * 20 + 1
            result = soup.select(value)

            if key == "title":
                for item in result:
                    if len(item.text) > 0:
                        bookinfo_key = "bookinfo" + str(suffix_info_number)
                        temp_data[bookinfo_key]["title"] = item.text
                        url_list.append(item.attrs["href"])
                        suffix_info_number = suffix_info_number + 1
            elif key == "price":
                for item in result:
                    print(item.text)
                    bookinfo_key = "bookinfo" + str(suffix_info_number)
                    temp_data[bookinfo_key][key] = item.text
                    suffix_info_number = suffix_info_number + 1
            else:
                for item in result:
                    bookinfo_key = "bookinfo" + str(suffix_info_number)
                    try:
                        temp_data[bookinfo_key][key] = item.text.lstrip().rstrip()
                        print(bookinfo_key, key, item.text.lstrip().rstrip())
                        suffix_info_number = suffix_info_number + 1
                    except:
                        break
        """ crawl detail info in url_list """
        suffix_info_number = (page - 1) * 20 + 1
        for url in url_list:
            bookinfo_key = "bookinfo" + str(suffix_info_number)
            req = requests.get("http://www.yes24.com" + url)
            temp_data[bookinfo_key]["url"] = "http://www.yes24.com/" + url
            print(bookinfo_key, temp_data[bookinfo_key]["url"])
            html = req.text
            soup = BeautifulSoup(html, "lxml")
            """ rank 좀 거시기 함 """
            temp_data[bookinfo_key]["rank"] = suffix_info_number
            print(bookinfo_key, suffix_info_number)
            """ selling_point """
            result = soup.select("span.gd_ratingArea > span.gd_sellNum")[0].text
            result = list(
                filter(str.isdigit, result.replace("|", "").lstrip().rstrip())
            )
            result = "".join(result)
            print(bookinfo_key, result)
            temp_data[bookinfo_key]["selling_point"] = result
            """ page """
            result = soup.select("#infoset_specific > div.infoSetCont_wrap")
            result = (
                result[0]
                .text.split(",")[2]
                .lstrip()
                .rstrip()
                .split("|")[0]
                .replace("크기", "")
                .strip()
            )
            temp_data[bookinfo_key]["page"] = result
            print(bookinfo_key, result)
            """ cagegory_of_yes24 """
            result = soup.select(
                "#infoset_goodsCate > div.infoSetCont_wrap > dl > dd > ul > li > a"
            )

            category_result = []
            for item in result:
                category_result.append(item.text)
                category_result = list(set(category_result))

            print(bookinfo_key, category_result)
            temp_data[bookinfo_key]["category_of_yes24"] = category_result
            """ ISBN """
            result = soup.select(
                ".tb_vertical > tbody:nth-child(3) > tr:nth-child(3) > td:nth-child(2)"
            )[0].text
            temp_data[bookinfo_key]["ISBN"] = result
            print(bookinfo_key, result)

            """ URL """
            temp_data[bookinfo_key]["url"] = "http://www.yes24.com" + url
            print(bookinfo_key, "http://www.yes24.com" + url)

            suffix_info_number = suffix_info_number + 1

    pp.pprint(temp_data)
    print("time :", time.time() - start)  # timer

    with open(
        "yes24_" + datetime.today().strftime("%Y_%m%d_%H%M_%S") + ".json",
        "w",
        encoding="UTF-8",
    ) as outfile:
        json.dump(temp_data, outfile, ensure_ascii=False)


crawl600BookData()