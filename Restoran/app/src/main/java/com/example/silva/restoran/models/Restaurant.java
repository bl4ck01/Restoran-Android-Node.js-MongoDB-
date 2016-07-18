package com.example.silva.restoran.models;
import com.google.android.maps.GeoPoint;

public class Restaurant {

    private String name;
    private GeoPoint coordinates;

    public Restaurant(String name, GeoPoint coordinates) {

        this.name = name;
        this.coordinates = coordinates;

    }

    public Restaurant() {
    }

    public GeoPoint getCoordinates() {
        return coordinates;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("Restaurant name=%s", name);
    }
}
