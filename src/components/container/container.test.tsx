import React from 'react';
import { mount } from 'enzyme';
import { Container } from './container';

describe('Container', () => {
  it('should render correctly', () => {
    const str = 'Hello';
    const wrap = mount(
      <Container>
        <p>{str}</p>
      </Container>
    );

    expect(wrap).toMatchInlineSnapshot(`
    <Container>
      <div
        className="Container"
      >
        <p>
          Hello
        </p>
      </div>
    </Container>
    `);

    // expect(wrap.find({ children: str }).is('p')).toBeTruthy();
    // expect(wrap.text()).toMatch(str);
    //   expect(wrap.html()).toEqual(`<div class="Container"><p>${str}</p></div>`);
    //   expect(wrap.contains(<p>{str}</p>)).toBeTruthy();
    //   expect(wrap).toMatchSnapshot();
    //   expect(wrap).toMatchInlineSnapshot(`
    //     <div
    //       className="Container"
    //     >
    //       <p>
    //         Hello
    //       </p>
    //     </div>
    //   `);
  });
});
