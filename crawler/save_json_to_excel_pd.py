import os
import json
import datetime
import openpyxl
import pandas as pd
import xlsxwriter


filePath = "./yes24_json_dump/"
wb = openpyxl.Workbook()
now_int_year = datetime.datetime.now().strftime("%Y")
now_int_month = datetime.datetime.now().strftime("%m")
now_int_day = datetime.datetime.now().strftime("%d")
excelfilename = (
    "yes24_" + now_int_year + "_" + now_int_month + "_" + now_int_day + ".xlsx"
)

writer = pd.ExcelWriter("./test.xlsx", engine="xlsxwriter")

for _file in os.listdir(filePath):
    with open(filePath + _file, encoding="utf-8") as json_file:
        json_data = json.load(json_file)
        if json_data is None:
            print("파일이 없습니다.")
            exit(1)

    df = pd.DataFrame(json_data)
    df = df.transpose()
    df.to_excel(writer, sheet_name=_file)

writer.save()