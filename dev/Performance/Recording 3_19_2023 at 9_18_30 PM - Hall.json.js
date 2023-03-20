const puppeteer = require('puppeteer'); // v13.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 816,
            height: 961
        })
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto('http://127.0.0.1:5500/SEO_HIF_JS/dev/api_dev.html');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Search:'
            ],
            [
                '#search-term'
            ],
            [
                'xpath///*[@id="search-term"]'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Search:'
            ],
            [
                '#search-term'
            ],
            [
                'xpath///*[@id="search-term"]'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 190.40625,
            y: 27,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Search:'
            ],
            [
                '#search-term'
            ],
            [
                'xpath///*[@id="search-term"]'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Search:'
            ],
            [
                '#search-term'
            ],
            [
                'xpath///*[@id="search-term"]'
            ]
        ], targetPage, { timeout, visible: true });
        const inputType = await element.evaluate(el => el.type);
        if (inputType === 'select-one') {
          await changeSelectElement(element, 'The Office')
        } else if ([
            'textarea',
            'text',
            'url',
            'tel',
            'search',
            'password',
            'number',
            'email'
        ].includes(inputType)) {
          await typeIntoElement(element, 'The Office');
        } else {
          await changeElementValue(element, 'The Office');
        }
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Search'
            ],
            [
                '#search-form > input[type=submit]:nth-child(3)'
            ],
            [
                'xpath///*[@id="search-form"]/input[2]'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Search'
            ],
            [
                '#search-form > input[type=submit]:nth-child(3)'
            ],
            [
                'xpath///*[@id="search-form"]/input[2]'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 4.953125,
            y: 18,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                '#search-results'
            ],
            [
                'xpath///*[@id="search-results"]'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                '#search-results'
            ],
            [
                'xpath///*[@id="search-results"]'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 221,
            y: 218,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/A fault tolerant control architecture for automated highway systems[role="link"]'
            ],
            [
                '#search-results > article:nth-child(2) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[2]/h2/a'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/A fault tolerant control architecture for automated highway systems[role="link"]'
            ],
            [
                '#search-results > article:nth-child(2) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[2]/h2/a'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 222,
            y: 7,
          },
        });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('w');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Fault tolerant memory design for HW/SW co-reliability in massively parallel computing systems[role="link"]'
            ],
            [
                '#search-results > article:nth-child(3) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[3]/h2/a'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Fault tolerant memory design for HW/SW co-reliability in massively parallel computing systems[role="link"]'
            ],
            [
                '#search-results > article:nth-child(3) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[3]/h2/a'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 205,
            y: 12,
          },
        });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('w');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Update'
            ],
            [
                '#next-page'
            ],
            [
                'xpath///*[@id="next-page"]'
            ],
            [
                'text/Update'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Update'
            ],
            [
                '#next-page'
            ],
            [
                'xpath///*[@id="next-page"]'
            ],
            [
                'text/Update'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 37.234375,
            y: 14,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Software reliability modeling of fault detection and correction processes[role="link"]'
            ],
            [
                '#search-results > article:nth-child(9) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[9]/h2/a'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Software reliability modeling of fault detection and correction processes[role="link"]'
            ],
            [
                '#search-results > article:nth-child(9) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[9]/h2/a'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 414,
            y: 8,
          },
        });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('w');
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Intelligent Fault Isolation of Control Valves in a Power Plant[role="link"]'
            ],
            [
                '#search-results > article:nth-child(10) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[10]/h2/a'
            ],
            [
                'text/Intelligent Fault'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Intelligent Fault Isolation of Control Valves in a Power Plant[role="link"]'
            ],
            [
                '#search-results > article:nth-child(10) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[10]/h2/a'
            ],
            [
                'text/Intelligent Fault'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 407,
            y: 5,
          },
        });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('w');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Update'
            ],
            [
                '#next-page'
            ],
            [
                'xpath///*[@id="next-page"]'
            ],
            [
                'text/Update'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Update'
            ],
            [
                '#next-page'
            ],
            [
                'xpath///*[@id="next-page"]'
            ],
            [
                'text/Update'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 27.234375,
            y: 20,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Model-based fault detection in induction Motors[role="link"]'
            ],
            [
                '#search-results > article:nth-child(3) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[3]/h2/a'
            ],
            [
                'text/Model-based fault'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Model-based fault detection in induction Motors[role="link"]'
            ],
            [
                '#search-results > article:nth-child(3) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[3]/h2/a'
            ],
            [
                'text/Model-based fault'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 236,
            y: 14,
          },
        });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('w');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Power system fault diagnosis modeling techniques based on encoded Petri nets[role="link"]'
            ],
            [
                '#search-results > article:nth-child(4) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[4]/h2/a'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Power system fault diagnosis modeling techniques based on encoded Petri nets[role="link"]'
            ],
            [
                '#search-results > article:nth-child(4) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[4]/h2/a'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 266,
            y: 1,
          },
        });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('w');
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Embedded model-based fault diagnosis for on-board diagnosis of engine control systems[role="link"]'
            ],
            [
                '#search-results > article:nth-child(6) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[6]/h2/a'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Embedded model-based fault diagnosis for on-board diagnosis of engine control systems[role="link"]'
            ],
            [
                '#search-results > article:nth-child(6) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[6]/h2/a'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 285,
            y: 9,
          },
        });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('w');
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/A Fault Recovery Approach in Fault-Tolerant Processor[role="link"]'
            ],
            [
                '#search-results > article:nth-child(8) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[8]/h2/a'
            ],
            [
                'text/A Fault Recovery'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/A Fault Recovery Approach in Fault-Tolerant Processor[role="link"]'
            ],
            [
                '#search-results > article:nth-child(8) > h2 > a'
            ],
            [
                'xpath///*[@id="search-results"]/article[8]/h2/a'
            ],
            [
                'text/A Fault Recovery'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 238,
            y: 9,
          },
        });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('w');
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([
            [
                'aria/Update'
            ],
            [
                '#next-page'
            ],
            [
                'xpath///*[@id="next-page"]'
            ],
            [
                'text/Update'
            ]
        ], targetPage, timeout);
        const element = await waitForSelectors([
            [
                'aria/Update'
            ],
            [
                '#next-page'
            ],
            [
                'xpath///*[@id="next-page"]'
            ],
            [
                'text/Update'
            ]
        ], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 22.234375,
            y: 12,
          },
        });
    }

    await browser.close();

    async function waitForSelectors(selectors, frame, options) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, options);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function scrollIntoViewIfNeeded(selectors, frame, timeout) {
      const element = await waitForSelectors(selectors, frame, { visible: false, timeout });
      if (!element) {
        throw new Error(
          'The element could not be found.'
        );
      }
      await waitForConnected(element, timeout);
      const isInViewport = await element.isIntersectingViewport({threshold: 0});
      if (isInViewport) {
        return;
      }
      await element.evaluate(element => {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'auto',
        });
      });
      await waitForInViewport(element, timeout);
    }

    async function waitForConnected(element, timeout) {
      await waitForFunction(async () => {
        return await element.getProperty('isConnected');
      }, timeout);
    }

    async function waitForInViewport(element, timeout) {
      await waitForFunction(async () => {
        return await element.isIntersectingViewport({threshold: 0});
      }, timeout);
    }

    async function waitForSelector(selector, frame, options) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to waitForSelector');
      }
      let element = null;
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (element) {
          element = await element.waitForSelector(part, options);
        } else {
          element = await frame.waitForSelector(part, options);
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('>>'));
        }
        if (i < selector.length - 1) {
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('|'));
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const {
        count = 1,
        operator = '>=',
        visible = true,
        properties,
        attributes,
      } = step;
      const compFn = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      }[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        let result = compFn(elements.length, count);
        const elementsHandle = await frame.evaluateHandle((...elements) => {
          return elements;
        }, ...elements);
        await Promise.all(elements.map((element) => element.dispose()));
        if (result && (properties || attributes)) {
          result = await elementsHandle.evaluate(
            (elements, properties, attributes) => {
              for (const element of elements) {
                if (attributes) {
                  for (const [name, value] of Object.entries(attributes)) {
                    if (element.getAttribute(name) !== value) {
                      return false;
                    }
                  }
                }
                if (properties) {
                  if (!isDeepMatch(properties, element)) {
                    return false;
                  }
                }
              }
              return true;

              function isDeepMatch(a, b) {
                if (a === b) {
                  return true;
                }
                if ((a && !b) || (!a && b)) {
                  return false;
                }
                if (!(a instanceof Object) || !(b instanceof Object)) {
                  return false;
                }
                for (const [key, value] of Object.entries(a)) {
                  if (!isDeepMatch(value, b[key])) {
                    return false;
                  }
                }
                return true;
              }
            },
            properties,
            attributes
          );
        }
        await elementsHandle.dispose();
        return result === visible;
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to querySelectorAll');
      }
      let elements = [];
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        if (i < selector.length - 1) {
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
        }
      }
      return elements;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      const timeoutId = setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          clearTimeout(timeoutId);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }

    async function changeSelectElement(element, value) {
      await element.select(value);
      await element.evaluateHandle((e) => {
        e.blur();
        e.focus();
      });
    }

    async function changeElementValue(element, value) {
      await element.focus();
      await element.evaluate((input, value) => {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }, value);
    }

    async function typeIntoElement(element, value) {
      const textToType = await element.evaluate((input, newValue) => {
        if (
          newValue.length <= input.value.length ||
          !newValue.startsWith(input.value)
        ) {
          input.value = '';
          return newValue;
        }
        const originalValue = input.value;
        input.value = '';
        input.value = originalValue;
        return newValue.substring(originalValue.length);
      }, value);
      await element.type(textToType);
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});
