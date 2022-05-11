import googlemaps   
          
def getAddressAndType(locations_arr):

    type_list = "accounting,airport, amusement_park,\
             aquarium, art_gallery, atm, bakery, bank, bar, \
                 beauty_salon, bicycle_store, book_store, bowling_alley, \
                     bus_station, cafe, campground, car_dealer, car_rental, \
                         car_repair, car_wash, casino, cemetery, church, city_hall, \
                             clothing_store, convenience_store, courthouse, dentist, \
                                 department_store, doctor, drugstore, electrician, \
                                     electronics_store, embassy, fire_station, florist, \
                                         funeral_home, furniture_store, gas_station, gym, \
                                             hair_care, hardware_store, hindu_temple, home_goods_store, \
                                                 hospital, insurance_agency, jewelry_store, laundry, \
                                                     lawyer, library, light_rail_station, liquor_store, local_government_office, locksmith, lodging, meal_delivery, meal_takeaway, mosque, movie_rental, movie_theater, moving_company, museum, night_club, painter, park, parking, pet_store, pharmacy, physiotherapist, plumber, police, post_office, primary_school, real_estate_agency, restaurant, roofing_contractor, rv_park, school, secondary_school, shoe_store, shopping_mall, spa, stadium, storage, store, subway_station, supermarket, synagogue, taxi_stand, tourist_attraction, train_station, transit_station, travel_agency, university, veterinary_care, zoo"
        
    gmaps = googlemaps.Client(key='AIzaSyCF-I4LgabjEwFFjMqHSuMNdX1_MTa6P6A')

    locations = locations_arr

    for latLng in locations:
        point = (latLng[0], latLng[1])

        # print(gmaps.reverse_geocode(point))

        place = gmaps.reverse_geocode(point)[0]

        # place = gmaps.places_nearby(point)

        address = place['formatted_address']
        itstype = place['types']
        for i in itstype:
            if i in type_list:
                real_type = i
                break
            else:
                real_type = place['types'][0]
        latLng.append(address)
        latLng.append(real_type)

    return locations