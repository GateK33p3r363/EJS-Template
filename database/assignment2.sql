-- CSE 340 Week 2 Assignment: Complete Your Database
-- Michael Molema

-- Question 1
INSERT INTO account (
	account_firstname,
	account_lastname,
	account_email,
	account_password
	)
VALUES (
	'Tony',
	'Stark',
	'tony@starkent.com',
	'Iam1ronM@n'
);

-- Question 2
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony';

-- Question 3
DELETE FROM account
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Question 4
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Question 5
SELECT inv_make, inv_model, classification_name
FROM inventory
	INNER JOIN classification
		ON inventory.classification_id = classification.classification_id
WHERE classification_name LIKE 'Sport';

-- Question 6
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', 'images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');

-- END OF LINE