const baseUrl = require('../api/utils/baseRoutController');

test('check for url parser to generate valid urls', () =>{
    expect(baseUrl('node','export','type'))
        .toBe('/api/v1/node/export/:type');
    expect(baseUrl('node',undefined,'nodeId'))
        .toBe('/api/v1/node/:nodeId');
});
