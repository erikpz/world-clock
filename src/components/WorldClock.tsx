import React, { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Autocomplete, Box, TextField } from "@mui/material";
import { TimeService } from "../services/TimeService";
import { areas } from "../utils/areas";
import { RowClock } from "./RowClock";

const ClockContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  /* width: "60%",
  maxWidth: 900, */
  width: 1000,
  padding: "35px 45px",
  margin: "30px 0",
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

export const WorldClock: FC = () => {
  const [search, setsearch] = useState<any>(null);
  const [results, setresults] = useState<any>([]);
  const [list, setlist] = useState<any>([]);

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
        console.log(location);
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
    setlist(newList);
  };

  useEffect(() => {
    /* console.log("search", search); */
    /*  console.log(results); */
    /* console.log("Lista:", list); */
  });

  useEffect(() => {
    console.log(list);
  }, [list]);

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

  return (
    <ClockContainer>
      <Autocomplete
        freeSolo
        disablePortal
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
        <Box sx={{ mt: 2 }}>
          {list.map((location: any, index: number) => (
            <RowClock
              location={location}
              key={location.element.label}
              handleRemove={() => handleRemove(location)}
              first={index === 0}
            />
          ))}
        </Box>
      )}
    </ClockContainer>
  );
};
