const request = require('supertest');
const app = require('../server'); 
const cheerio = require('cheerio'); // For parsing HTML and validating styles

describe('GET /', () => {
    it('should return 200 OK for the URL http://localhost:5000/', async () => {
        const res = await request('http://localhost:5000').get('/');
        expect(res.statusCode).toBe(200);
    });

    it('should contain the site name "Darkroom"', async () => {
        const res = await request('http://localhost:5000').get('/');
        expect(res.text).toContain('Darkroom');
    });

    it('should contain the text "MILESTONE"', async () => {
        const res = await request('http://localhost:5000').get('/');
        expect(res.text).toContain('MILESTONE');
    });

    it('should contain "MILESTONE 2", "MILESTONE 3", and "MILESTONE 4"', async () => {
        const res = await request('http://localhost:5000').get('/');
        expect(res.text).toContain('MILESTONE 2');
        expect(res.text).toContain('MILESTONE 3');
        expect(res.text).toContain('MILESTONE 4');
    });

    it('should validate that font sizes for MILESTONE, MILESTONE 2, MILESTONE 3, and MILESTONE 4 are defined and different', async () => {
        const res = await request('http://localhost:5000').get('/');
        const $ = cheerio.load(res.text);
    
        // Extract inline styles for font sizes
        const milestoneStyle = $('h1:contains("MILESTONE")').attr('style');
        const milestone2Style = $('h1:contains("MILESTONE 2")').attr('style');
        const milestone3Style = $('h1:contains("MILESTONE 3")').attr('style');
        const milestone4Style = $('h1:contains("MILESTONE4")').attr('style');
    
        // Ensure the style attribute exists
        expect(milestoneStyle).toBeDefined();
        expect(milestone2Style).toBeDefined();
        expect(milestone3Style).toBeDefined();
        expect(milestone4Style).toBeDefined();
    
        // Extract font-size values from the style attributes
        const milestoneFontSize = milestoneStyle.match(/font-size:\s*([\d.]+rem)/)?.[1];
        const milestone2FontSize = milestone2Style.match(/font-size:\s*([\d.]+rem)/)?.[1];
        const milestone3FontSize = milestone3Style.match(/font-size:\s*([\d.]+rem)/)?.[1];
        const milestone4FontSize = milestone4Style.match(/font-size:\s*([\d.]+rem)/)?.[1];
    
        // Ensure font-size values are defined
        expect(milestoneFontSize).toBeDefined();
        expect(milestone2FontSize).toBeDefined();
        expect(milestone3FontSize).toBeDefined();
        expect(milestone4FontSize).toBeDefined();
    
        // Ensure font sizes are different
        expect(milestoneFontSize).not.toBe(milestone2FontSize);
        expect(milestone2FontSize).not.toBe(milestone3FontSize);
        expect(milestone3FontSize).not.toBe(milestone4FontSize);
        expect(milestoneFontSize).not.toBe(milestone4FontSize);
    });
});