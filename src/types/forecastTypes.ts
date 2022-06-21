export interface forecastTypes {
  cod: number;
  message: number,
  cnt: 3,
  list:[{
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    }
  }]
    clouds: {
        all: number;
    }
   wind: {
        speed: number;
        deg: number;
        gust: number;
    }
    sys:{
          pod: string;
    }
}


