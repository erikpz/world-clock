import React, { FC, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Autocomplete, Box, TextField } from "@mui/material";
import { TimeService } from "../services/TimeService";
import { areas } from "../utils/areas";
import { RowClock } from "./RowClock";

export const WorldClock: FC = () => {
  const [search, setsearch] = useState<any>(null);
  const [results, setresults] = useState<any>([]);
  const [list, setlist] = useState<any>([]);
  const [mous, setmous] = useState<any>(0);
  const refbox = useRef<any>();
  /* const hoursBox = refbox.current?.lastChild.lastChild ?? null;
  if (hoursBox) {
    const computed = window.getComputedStyle(hoursBox).getPropertyValue("width");
    const computed = hoursBox.getBoundingClientRect();
    console.log(computed);
  } */

  const handleSearch = async (srch: string) => {
    let arr: any = [];
    areas.forEach((a: any) => {
      a.locations.forEach((loc: string) => {
        if (loc.toLowerCase().includes(srch.toLowerCase())) {
          arr = [...arr, { area: a.area, label: loc }];
        }
      });
    });
    setresults(arr);
  };

  const handleFetch = async (e: any, value: any) => {
    if (value) {
      try {
        let locExists = false;
        const location = search.label.replaceAll(" ", "_");
        const timeService = TimeService.getInstance();
        const response = await timeService.getTimeLocations(
          search.area,
          location
        );
        list.forEach((l: any) => {
          if (l.element.label === search.label) {
            locExists = true;
          }
        });
        if (!locExists) {
          setlist([...list, { element: search, data: response.data }]);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleRemove = (element: any) => {
    const newList = list.filter(
      (filt: any) => filt.element.label !== element.element.label
    );
    setlist([...newList]);
  };

  const handleSetMain = (element: any) => {
    const newList = list.filter(
      (filt: any) => filt.element.label !== element.element.label
    );
    setlist([element, ...newList]);
  };

  useEffect(() => {
    const fetchDefault = async () => {
      const timeService = TimeService.getInstance();
      const response = await timeService.getTimeLocations(
        "America",
        "Mexico_city"
      );
      setlist([
        {
          element: { area: "America", label: "Mexico City" },
          data: response.data,
        },
      ]);
    };
    fetchDefault();
  }, []);

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <Container>
      <ClockContainer>
        <Autocomplete
          freeSolo
          clearOnBlur
          clearOnEscape
          options={results}
          onChange={handleFetch}
          onHighlightChange={(e: any, sel: any) => setsearch(sel)}
          onInputChange={(e: any, newInput: string) => handleSearch(newInput)}
          sx={{ width: 300 }}
          renderInput={(params: any) => (
            <InputSearch
              {...params}
              placeholder="Find place or timezone - Press 'Enter'"
            />
          )}
        />

        {list.length > 0 && (
          <Box ref={refbox} sx={{ mt: 2, position: "relative" }}>
            {refbox.current && (
              <Box
                sx={{
                  cursor: "pointer",
                  position: "absolute",
                  width: 25,
                  padding: "0px 2px",
                  boxSizing: "border-box",
                  height: 80 * list.length,
                  border: "2px solid #F49C76",
                  borderRadius: 1,
                  top: 0,
                  backgroundColor: "rgba(244, 156, 118,0.3)",
                  left: mous - refbox.current.getBoundingClientRect().left,
                }}
              />
            )}

            {list.length > 0 &&
              list.map((location: any, index: number) => (
                <RowClock
                  key={location.element.label}
                  first={index === 0}
                  homeLocation={list[0]}
                  location={location}
                  handleRemove={() => handleRemove(location)}
                  handleSetMain={() => handleSetMain(location)}
                  setPos={setmous}
                  list={list}
                />
              ))}
          </Box>
        )}
      </ClockContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
}));

const ClockContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 1000,
  padding: "35px 25px",
  margin: "30px auto",
  borderRadius: 20,
  boxShadow:
    "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
}));

const InputSearch = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ddd",
      borderRadius: 15,
    },
  },
}));
