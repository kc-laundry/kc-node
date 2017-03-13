#KC Laundry Service Project


### Order Related APIs

> GET http://localhost:3000/api/v1/orders


> GET http://localhost:3000/api/v1/orders/:orderID


> GET http://localhost:3000/api/v1/orders/pregen/order


> PATCH : http://localhost:3000/api/v1/orders/:ID/laundryItems

#####Body example

```
{
   “laundryItems” :  [
            {
            “name”: “Jeans”,
            “total”: 3,
             “count”: 5,
             “toWash”:true,
               “toDry”:true,
            },
            {
                . . .
            }
    ]
}

```

> PATCH : http://localhost:3000/api/v1/orders/:ID/service

#####Body example

```
{
    services: [ “ Scented “, “ Hot Wash “, “Regular Dry" , "No Softner" ]
}
```

> PATCH : http://localhost:3000/api/v1/orders/:ID/pickup


#####Body example

```
{
    pickupDetails: {
          location: {
                 lat: “ xxxxxx  “,
                 long:” xxxxx”,
                 address: “xxxxx”
         },
          when: “ “,
          instruction: “”

     }

}
```

> PATCH : http://localhost:3000/api/v1/orders/:ID/dropoff


#####Body example

```
{
    dropoffDetails: {
          location: {
                 lat: “ xxxxxx  “,
                 long:” xxxxx”,
                 address: “xxxxx”
         },
          when: “ “,
          instruction: “”

     }

}
```