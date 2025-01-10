import { ReactDOM, useEffect, useState } from "react";
import React from "react";
import "./App.css";

export default function App() {
  // Góc nhìn người dùng
  // 1. Bấm vào button
  // 2. Nhìn thấy list sản phẩm hiện ra

  // Góc nhìn dev
  // 1. Tạo nút button
  // 2. Gọi API để lấy sản phẩm khi được ấn nút
  // 3. Lưu dữ liệu và state
  // 4. Hiển thị sản phẩm
  const [products, setProducts] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/products");
        console.log(response);
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function showItemHandler() {
    setIsShow(!isShow);
  }

  return (
    <>
      <div className="container">
        <button className="toggle-btn" onClick={showItemHandler}>
          {isShow ? "Ẩn sản phẩm" : "Xem sản phẩm"}
        </button>
        {isShow && (
          <table className="product-table">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <Item
                  key={product.id}
                  name={product?.name}
                  price={product?.price}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

function Item({ name, price }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}
