'use strict';
const assert = require('assert');
const {
    openBrowser, closeBrowser, meta, goto, reload ,$, $$, link, listItem, inputField, textField,
    image, button, comboBox, checkBox, radioButton, text, contains, click, doubleClick, rightClick,
    write, press, upload, highlight, scrollTo, hover, screenshot, to, into,
} = require('./helper');

beforeSuite(async() => openBrowser());

afterSuite(async() => closeBrowser());

step('Navigate to Gauge homepage <query>', async query => goto(query));

step('Display the Gauge logo', async() => assert.ok(await image('Gauge logo').exists()));

step('Go to Gauge get started page', async() => click('Get Started'));

step('Display the sub title <title>', async(title) => assert.ok(await text(title).exists()));

step('Go to Gauge documentation page', async() => click($(`//*[text()='Documentation']`)));

step('Display the Gauge version', async() => assert.ok(await contains('0.9.3').exists()));

step('Go to plugins page', async() => {
    assert.ok(await link('Get Started').exists());
    assert.ok(await link(text('Get Started')).exists());
    assert.ok(await link('Star').exists());
    assert.ok(await $$(`//a[text()='Get Started']`).exists());

    await hover('Get Started');
    await click('Plugins');
});

step('Display the official plugins', async() => {
    assert.ok(await text('Gauge Plugins').exists());

    assert.ok(await contains('Java runner').exists());
    await highlight(contains('Java runner'));

    assert.ok(await contains('C# runner').exists());
    assert.ok(await contains('Ruby runner').exists());
});

step('Search for Hooks', async() => {
    const field = inputField('placeholder', 'Search docs');
    await write('Hooks', into(field));
    assert.equal(await field.value(), 'Hooks')
    await press('Enter');

    assert.ok(await link('Language Features').exists());
});

step('Display the IDE plugins', async() => {
    await click('Using Gauge');

    await scrollTo(listItem('Intellij IDEA'));

    assert.ok(await listItem('Intellij IDEA').exists());
    assert.ok(await listItem('Visual Studio').exists());
});

step('Combo Box', async() => {
    const box = comboBox('Cars');
    assert.ok(await box.exists());
    await box.select('Saab');
    assert.equal(await box.value(), 'saab');
});

step('Check Box', async() => {
    const box = checkBox('Vehicle');
    assert.ok(await box.exists());
    await click(box, { waitForNavigation: false });
    assert.ok(await box.isChecked());
});

step('Radio Button', async() => {
    const button = radioButton('Female');
    assert.ok(await button.exists());
    await click(button, { waitForNavigation: false });
    assert.ok(await button.isSelected());
});

step('Upload', async() => {
    const field = inputField('id', 'file');
    await upload('file.txt', to(field));
    assert.ok((await field.value()).endsWith('file.txt'));
});

step('Text Field', async() => {
    const field = textField('Username');
    await write('Gopher', into(field));
    assert.ok(await field.exists());
    assert.equal(await field.value(), 'Gopher');
});