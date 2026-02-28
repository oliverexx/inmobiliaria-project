import type { Metadata } from "next";
import FavoritosClient from "./FavoritosClient";

export const metadata: Metadata = {
    title: "Mis Favoritos",
    description: "Propiedades guardadas como favoritas en Calzada Inmobiliaria.",
};

export default function FavoritosPage() {
    return <FavoritosClient />;
}
