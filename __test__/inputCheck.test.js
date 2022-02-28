const inputCheck = require('../utils/inputCheck');

test('inputCheck() returns null when all the properties exist', () => {
    const obj = {name: 'jenny'};

    expect(inputCheck(obj, 'name')).toBe(null);
});

test('inputCheck() returns an object when a property is missing', () => {
    const obj = {name: 'jenny', occupation: ''};

    expect(inputCheck(obj, 'name', 'occupation')).toEqual(
        expect.objectContaining({
            error: expect.stringContaining('No occupation specified')
        })
    );
});