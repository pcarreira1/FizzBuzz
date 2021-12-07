# Lambda code

**Language:** typescript

#### Description
Endpoint written to receive a number as input and fulfill these requirements:
- any number divisible by three returns the word fizz
- any number divisible by five returns the word buzz
- Numbers divisible by both 3 and 5 returns fizzbuzz
- any number not divisible by 3 and/or 5 returns the number provided in the input object

#### Handlers
##### Name: fizzBuzzHandler
###### Input
| Parameter   | Type 								|
| ----------- | ------------------- |
| body        | { number: integer }	|

Example:
```json
{
  "body": {
    "number": 15
  }
}
```

###### Output
| Parameter   | Type 																	   |
| ----------- | ---------------------------------------- |
| statusCode  | integer      														 |
| body     		| {number: integer, result: string }       |
| headers  		| {[key: string]: string }     					   |

Example:
```json
{
  "statusCode": 200,
  "body": {
    "number": 15,
    "result": "fizzbuzz"
  },
  "headers": { 
    "Content-Type": "application/json"
  }
}
```

#### Tests
**Framework:** Jest

##### Unit tests
Unit tests files are located in the src folder with *.spec* extension.
These tests are testing each isolated function 

```sh
	npm test # run all the unit tests
	# or
	npm run test:coverage # run all the unit tests and display the coverage report
```

##### Functional tests
Functional tests files are located in the test folder with *.spec* extension.
These tests are testing business logic of the full scope of the lambda handler

```sh
	npm run functional:tests
```

#### Other Project commands

##### Build the typescript code
```sh
	npm run build
```

##### Test and build the code
```sh
	npm run compile
```