import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { locationList, foodList } from "../data/category_list"

const DropBox = ({ onChange, defaultValue }) => {
  const setDefaultValue = defaultValue => {
    if (defaultValue) {
      const { location1, location2, food } = defaultValue
      return { location1: location1, location2: location2, food: food }
    } else {
      return { location1: null, location2: null, food: null }
    }
  }

  const [value, setValue] = useState(setDefaultValue(defaultValue))
  const { location1, location2, food } = value
  const style = {
    width: "100%",
  }

  const handleChange = useCallback(
    (e, newValue) => {
      const id = e.target.id.split("-")[0]
      setValue({ ...value, [id]: newValue })
    },
    [value],
  )

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <DropBoxWrapper>
      <Autocomplete
        disablePortal
        id="location1"
        size="small"
        options={Object.keys(locationList)}
        sx={style}
        renderInput={params => <TextField {...params} variant="standard" label="시/도" />}
        value={location1}
        onChange={handleChange}
      />
      <Autocomplete
        disablePortal
        id="location2"
        size="small"
        options={location1 ? locationList[location1] : null}
        sx={style}
        renderInput={params => <TextField {...params} variant="standard" label="시/군/구" />}
        value={location2}
        onChange={handleChange}
        disabled={!location1 ? true : false}
      />
      <Autocomplete
        disablePortal
        id="food"
        size="small"
        options={foodList}
        sx={style}
        renderInput={params => <TextField {...params} variant="standard" label="카테고리" />}
        value={food}
        onChange={handleChange}
      />
    </DropBoxWrapper>
  )
}

export default DropBox

const DropBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.5rem;
`
