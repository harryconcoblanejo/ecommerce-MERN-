import React, { useState } from 'react'
import './styles.css'
import axios from 'axios'
// type FormData2 = {
//   data: {
//     items: [title: string, unit_price: number, quantity: number]
//   }
// }

const formTest = () => {
  let data = {
    items: [
      {
        title: 'mi poronga',
        unit_price: '2500',
        quantity: '1',
      },
    ],
  }

  const comprar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const send = new FormData()
    // send.append('preference{}', JSON.stringify(data))

    // console.log(send)

    try {
      const res = await axios.post('http://localhost:3000/checkout', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      window.location.href = res.data.respuesta.init_point

      console.log('comprando')
      // console.log(data)
    } catch (error) {
      console.log(error)
    }

    // console.log('comprand2')
    // const res = await axios.post('http://localhost:3000/checkout')
    // console.log(res)
  }

  return (
    <div>
      <h1>My mercado libre test form</h1>
      <form
        onSubmit={comprar}
        encType="multipart/form-data"
        action="http://localhost:3000/checkout"
        method="POST"
      >
        <h2>Mi poronga</h2> <br />
        <h2>Precio:$ 2500</h2>
        <br />
        <h2>catnidad: 1</h2>
        <br />
        <input type="submit" value="comprar" />
      </form>
    </div>
  )
}

export default formTest
