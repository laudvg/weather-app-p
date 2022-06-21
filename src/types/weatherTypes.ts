export interface weatherTypes {
    name: string;
    
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };

    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };

    wind: {
      speed: number;
      deg: number;
    };

    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };

    clouds: {
        all: number;
    }
}
  
//   export type ExtendedTypes = {
//     day: string;
//     temp: {
//       temp_min: number;
//       temp_max: number;
//     };
//     weather: {
//       id: number;
//       main: string;
//     };
//   }

// interface Coord {
//     lon: number;
//     lat: number;
// }

// interface Weather {
//     id: number;
//     main: string;
//     description: string;
//     icon: string;
// }

// interface Main {
//     temp: number;
//     feels_like: number;
//     temp_min: number;
//     temp_max: number;
//     pressure: number;
//     humidity: number;
//     sea_level: number;
//     grnd_level: number;
// }

// interface Wind {
//     speed: number;
//     deg: number;
//     gust: number;
// }

// interface Clouds {
//     all: number;
// }

// interface Sys {
//     country: string;
//     sunrise: number;
//     sunset: number;
// }

// export interface weatherTypes {
//     base: string;
//     dt: number;
//     timezone: number;
//     id: number;
//     name: string;
//     cod: number;
//     visibility: number;
    
//     coord: {
//         [key: string]: Coord;
//     };
    
//     weather: {
//         [key: string]: Weather;
//     };
    
//     main: {
//         [key: string]: Main;
//     };

//     wind: {
//         [key: string]: Wind;
//     };

//     clouds: {
//         [key: string]: Clouds;
//     }

//     sys: {
//         [key: string]: Sys;
//     }

// }

