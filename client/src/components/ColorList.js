import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("This is colors", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const { id } = useParams();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth()
    .put(`/api/colors/${id}`, colorToEdit)
    .then(response => {
      // console.log("THIS IS EDIT GOOD!", response.data)

      updateColors([
        ...colors.map(X => {
          if(X.id == response.data.id) {
            X = response.data;
            // console.log("THIS IS X", X);
            return X;
          } else {
            return X;
          }
        })
      ])
    })
    .catch(error => console.log("This is errro bad", error.response))
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // color.preventDefault();

    axiosWithAuth()
    .delete(`/api/colors/${color.id}`, color)
    .then(response => {
      console.log("THIS IS DELETE", response.data)

      const filterColors = colors.filter(item => item.id != response.data)
      // colors.filter(item => `${item.id} != response.data`)
      updateColors(filterColors);
    })
    .catch(error => {
      console.log(error)
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
