import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  const addToCartClick =()=>{
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isInCart: !item.isInCart
      })
    })
    .then(resp=>resp.json())
    .then(updatedItem => onUpdateItem(updatedItem))
  }

  const handleDeleteClick =()=>{
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((item) => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={addToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
