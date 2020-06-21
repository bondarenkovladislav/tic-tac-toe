import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Avatar,
    ThemeProvider,
} from '@material-ui/core'
import styles from './ResultsPage.module.scss'
import { ToolBar, theme } from './AuthorisationForm'
import { ApiClient } from '../classes/services/ApiClient'

function createData(userName: string, winCount: number) {
  return { userName, winCount }
}

interface IUserScore {
  userName: string
  winCount: number
}

function setPicture(num: number, topValue: number[]) {
  var src =
    'https://www.vippng.com/png/detail/486-4864508_estrella-sin-fondo-imagui-174-gifs-y-fondos.png'
  if (num == topValue[0])
    src = 'https://static.my-shop.ru/product/3/390/3898083.jpg'
  if (num == topValue[1])
    src =
      'https://123mesto.ru/wa-data/public/shop/products/49/43/14349/images/22435/22435.750x0.jpg'
  if (num == topValue[2])
    src = 'https://static.my-shop.ru/product/3/390/3898477.jpg'
  return src
}

export const ResultsPage = (props: any) => {
  const [rows, setRows] = useState<IUserScore[]>([])
  const [topValues, setTopValues] = useState<any[]>([])

  const fetch = async () => {
    const res = await ApiClient.fetchLeaderBoard()
    setRows(res || [])
    console.log(res)
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    if (rows.length) {
      const first = rows[0].winCount
      var second = rows[0].winCount
      var third = rows[0].winCount

      for (var i = 1;i<rows.length ; i++) {
        if (rows[i].winCount != first) {
          second = rows[i].winCount
          console.log(second)
          break
        }
      }

      for (var i = 1;i<rows.length ; i++) {
          console.log(rows)
        if (rows[i].winCount != first && rows[i].winCount != second) {
          third = rows[i].winCount
          console.log(third)
          break
        }
      }

      var topValuesLocal = [first, second, third]
      setTopValues(topValuesLocal)
      console.log(topValues[0])
      console.log(topValues[1])
      console.log(topValues[2])
    }
  }, [rows])

  return (
    <ThemeProvider theme={theme}>
    <div className={styles.root}>
      <div className={styles.letter}>TOP PLAYERS</div>
      <div className={styles.block}>
        <ToolBar />
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              {rows.map((row) => (
                <TableRow>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      className={styles.avatar}
                      src={setPicture(row.winCount, topValues)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {rows.lastIndexOf(row) + 1}
                  </TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center">{row.winCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    </ThemeProvider>
  )
}
