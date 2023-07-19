import requests
from bs4 import BeautifulSoup
import pandas as pd

URLs = ['http://ufcstats.com/statistics/fighters?char=' + chr(letter) + '&page=all' for letter in range(ord('a'), ord('z') + 1)]

data = []  

for URL in URLs:
    r = requests.get(url=URL)
    soup = BeautifulSoup(r.text, 'html.parser')

    table = soup.find('table', class_='b-statistics__table')
    columns = table.find('thead').find_all('th', class_='b-statistics__table-col')

    headers = [column.text.strip() for column in columns]

    rows = table.find('tbody').find_all('tr', class_='b-statistics__table-row')

    for row in rows:
        cells = row.find_all(['th', 'td'])
        row_data = [cell.text.strip() for cell in cells]
        data.append(row_data)

df = pd.DataFrame(data, columns=headers)
df.to_csv('ufc.csv', index=False)
