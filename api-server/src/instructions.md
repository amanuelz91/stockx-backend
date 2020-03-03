## Example:

Shoe: adidas Yeezy
True to size data: 1, 2, 2, 3, 2, 3, 2, 2, 3, 4, 2, 5, 2, 3
True to size calculation: 2.5714285714286

## If we add another data point, 2, to the collected data, our calculation should reflect this change.

Shoe: adidas Yeezy
True to size data: 1, 2, 2, 3, 2, 3, 2, 2, 3, 4, 2, 5, 2, 3, 2
True to size calculation: 2.5333333333333

# API

# Post true-to-size (for shoe)
## Input: Shoe name, true-to-size
### Response: true-to-size, shoe

1) Invoke function 
    TrueToSizeCalculation = average of the true to size entries for a given shoe
2) Store on database
3) Return new true-to-size & shoe (if dB response ok, else error)

# Get true-to-size (for shoe)
## Input: Shoe name
### Response: true-to-size, shoe

1) Get true-to-size for shoe from database
2) Return true-to-size, shoe (if it exists, else false/error)



|--> Postgres Service  
|   |
|   |--> Table: shoe (name) | true-to-size (value)
|
|--> API Service 
    |
    |--> GET true-to-size
    |
    |--> POST true-to-size







