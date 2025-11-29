export type Coordinate = {
    latitude: number,
    longitude: number
}

export type Zone = {
    id : string,
    name:string,
    vertices: Coordinate[]
}