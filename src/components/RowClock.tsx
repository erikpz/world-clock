import React, { FC, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { ArrowUpwardTwoTone, Delete, Home } from "@mui/icons-material";

interface RowClockProps {
  location: any;
  handleRemove: any;
  handleSetMain: any;
  homeLocation: any;
  setPos: any;
  list: any;
  first?: boolean;
}

export const RowClock: FC<RowClockProps> = (props) => {
  const { location, handleRemove, homeLocation, first, list } = props;
  const [locTime, setlocTime] = useState<any>();
  const [homeTime, sethomeTime] = useState<any>();
  const [changeIcon, setchangeIcon] = useState<any>(false);
  const ref = useRef<any>();

  const getDifference = () => {
    /* Funcion para calcular la diferencia de hora entre la ciudad actual
    y la ciudad principal */
    if (locTime && homeTime) {
      let dif = (locTime.getTime() - homeTime.getTime()) / 1000;
      dif /= 60;
      dif = Math.ceil(dif);

      if (dif / 60 === 0) {
        return dif / 60;
      }

      return Math.floor(dif / 60);
      /* const dif = locTime.getDay() - homeTime.getDay();
      const hourLoc = locTime.getHours();
      const hourHome = homeTime.getHours();
      if (dif === 0) {
        return hourLoc - hourHome;
      } else if (dif > 0) {
        return hourLoc - hourHome - 24;
      }
      return (hourHome - hourLoc - 24) * -1; */
    }
    return "";
  };

  const getHourColor = (num: number, prop: string) => {
    /* Funcion para obtener el estilo de los colores de 
    cada cajita de cada hora de la fila */
    if (prop === "bg") {
      if ([0, 1, 2, 3, 4, 5, 21, 22, 23].includes(num)) {
        return "#323D48";
      } else if ([6, 7, 18, 19, 20].includes(num)) {
        return "#DBEDFF";
      } else {
        return "white";
      }
    } else {
      if ([0, 1, 2, 3, 4, 5, 21, 22, 23].includes(num)) {
        return "white";
      } else {
        return "#323D48";
      }
    }
  };

  const getBorders = (num: number) => {
    /* Funcion para obtener el estilo de los border inicial y final de cada dia  */
    if (num === 23) {
      return "0 8px 8px 0";
    } else if (num === 0) {
      return "8px 0 0 8px";
    }
    return 0;
  };

  const getNextDay = () => {
    /* Funcion para obtener la hora actual o la siguiente dependiendo las fechas
    y mostrarlo en la fila de las horas */
    const hrs = getHoursArray();
    if (hrs[0] === 0) {
      return locTime?.getDate();
    }
    const nday = new Date(
      locTime.getFullYear(),
      locTime.getMonth(),
      locTime.getDate()
    );
    nday.setDate(nday.getDate() + 1);

    return nday?.getDate();
  };

  const convertTo12Hours = (h: number) => {
    if (h > 12) {
      return h - 12;
    }
    return h;
  };

  const getNextMonth = () => {
    /* Funcion para obtener el mes actual o el siguiente dependiendo las fechas
    y mostrarlo en la fila de las horas */
    if (locTime) {
      const hrs = getHoursArray();
      const lastDayMonth = new Date(
        locTime.getFullYear(),
        locTime.getMonth() + 1,
        0
      ).getDate();
      let res;
      if (hrs[0] === 0) {
        res = locTime.toLocaleDateString("en-US", {
          month: "short",
        });
        return res;
      }
      if (locTime.getDate() === lastDayMonth) {
        let next: any = new Date(locTime.getFullYear(), locTime.getMonth() + 1);
        res = next.toLocaleDateString("en-US", {
          month: "short",
        });
        return res;
      }
      return locTime.toLocaleDateString("en-US", {
        month: "short",
      });
    }
    return "";
  };

  const getHoursArray = () => {
    /* Funcion para obtener el array de las 24 horas del dia
    con el desplazamiento correspondiente con base en la fecha de la locacion principal */
    let hArr: number[] = [];
    if (locTime && homeTime) {
      let hour = first ? homeTime.getHours() : locTime.getHours();
      for (let i = 0; i < 24; i++) {
        if (hour + i > 23) {
          hArr = [...hArr, hour + i - 24];
        } else {
          hArr = [...hArr, hour + i];
        }
      }
      return hArr;
    }
    return hArr;
  };

  const resetPos = () => {
    if (locTime && homeTime && first) {
      let currentTime = locTime.getHours();
      let pos = getHoursArray().indexOf(currentTime);
      props.setPos(ref.current?.getBoundingClientRect().left + 25 * pos);
    }
  };

  useEffect(() => {
    resetPos();
    setchangeIcon(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, first, locTime]);

  useEffect(() => {
    /* Efecto unico e inicial para establecer la 
    fecha de la locacion de cada fila y la de la principal (Referencia) */
    setlocTime(
      new Date(
        new Date(location.data.datetime).toLocaleString("en-US", {
          timeZone: location.data.timezone,
        })
      )
    );
    sethomeTime(
      new Date(
        new Date(homeLocation.data.datetime).toLocaleString("en-US", {
          timeZone: homeLocation.data.timezone,
        })
      )
    );
  }, [location, homeLocation]);

  return (
    <RowContainer>
      <IconButton onClick={handleRemove} sx={{ p: 0 }}>
        <Delete sx={{ color: "#323D48" }} fontSize="small" />
      </IconButton>
      {first ? (
        <Home fontSize="small" sx={{ p: 1, color: "#323D48" }} />
      ) : (
        <Tooltip
          title="Cambiar a principal"
          placement="top"
          onMouseOver={() => setchangeIcon(true)}
          onMouseLeave={() => setchangeIcon(false)}
        >
          <IconButton sx={{ color: "#323D48" }} onClick={props.handleSetMain}>
            {changeIcon ? (
              <ArrowUpwardTwoTone sx={{ width: "20px" }} />
            ) : (
              <Typography
                align="center"
                variant="subtitle1"
                sx={{ width: "20px", color: "#323D48" }}
              >
                {getDifference()}
              </Typography>
            )}
          </IconButton>
        </Tooltip>
      )}

      <Box sx={{ width: 170 }}>
        <Typography
          sx={{ fontSize: "14px", fontWeight: 600, color: "#323D48" }}
        >
          {location.element.label}
        </Typography>
        <Typography variant="caption" sx={{ color: "#555" }}>
          {location.element.area}
        </Typography>
      </Box>

      <Box sx={{ width: 110 }}>
        <Typography
          sx={{ fontSize: "14px", fontWeight: 600, color: "#323D48" }}
        >
          {`${locTime?.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })} ${location.data.abbreviation}`}
        </Typography>
        <Typography variant="caption" sx={{ color: "#555" }}>
          {`${locTime?.toLocaleDateString("en-US", {
            weekday: "short",
          })}, ${locTime?.toLocaleDateString("en-US", {
            month: "short",
          })} ${locTime?.getDate()}`}
        </Typography>
      </Box>

      <Box
        ref={ref}
        sx={{
          alignSelf: "stretch",
          width: 600,
          display: "flex",
          alignItems: "center",
        }}
        onMouseMove={(e: any) => {
          props.setPos(e.target.getBoundingClientRect().left);
        }}
      >
        {getHoursArray().map((n: number, i: number) => (
          <Box
            key={n}
            sx={{
              width: 25,
              boxSizing: "border-box",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 43,
                bgcolor: getHourColor(n, "bg"),
                color: getHourColor(n, "col"),
                borderRadius: getBorders(n),
                /* padding: "5px 0", */
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: n === 0 ? (i !== 0 ? "4px" : 0) : 0,
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontSize: n === 0 ? "10px" : "14px",
                  fontWeight: 600,
                  my: n === 0 ? "2.5px" : 0,
                }}
              >
                {n === 0 ? getNextMonth() : convertTo12Hours(n)}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  display: "block",
                  fontWeight: 400,
                  fontSize: "9px",
                }}
                variant="caption"
              >
                {n === 0 ? getNextDay() : n > 11 ? "pm" : "am"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </RowContainer>
  );
};

const RowContainer = styled(Box)(({ theme }) => ({
  height: 80,
  display: "flex",
  alignItems: "center",
  gap: 15,
}));
