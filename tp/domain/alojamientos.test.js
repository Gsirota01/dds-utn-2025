const { Alojamiento } = require("./Alojamiento.js");

const alojamientoEjemplo = new Alojamiento(
    "Anfitrión", "Casa en la playa", "Hermosa vista al mar", 100, "USD",
    "14:00", "11:00", "Calle 123", 4, [],
    [
        { rangoFechas: { fechaInicio: new Date("2025-04-10"), fechaFin: new Date("2025-04-15") } },
        { rangoFechas: { fechaInicio: new Date("2025-04-20"), fechaFin: new Date("2025-04-25") } }
    ],
    []
);

test("Debe devolver false si el rango solicitado se superpone con una reserva existente", () => {
    const rangoSolapado = { fechaInicio: new Date("2025-04-12"), fechaFin: new Date("2025-04-18") };
    expect(alojamientoEjemplo.estasDisponibleEn(rangoSolapado)).toBe(false);
});

test("Debe devolver true si el rango solicitado no se superpone con ninguna reserva existente", () => {
    const rangoLibre = { fechaInicio: new Date("2025-04-16"), fechaFin: new Date("2025-04-19") };
    expect(alojamientoEjemplo.estasDisponibleEn(rangoLibre)).toBe(true);
});

test("Debe devolver false si la reserva ocupa exactamente las mismas fechas que una existente", () => {
    const mismoRango = { fechaInicio: new Date("2025-04-10"), fechaFin: new Date("2025-04-15") };
    expect(alojamientoEjemplo.estasDisponibleEn(mismoRango)).toBe(false);
});