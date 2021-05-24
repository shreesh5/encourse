import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';

import Spacer from '../src/components/Spacer';

describe('<Spacer />', () => {
  it('Renders children', async () => {
    const {getByText} = await render(
      <Spacer>
        <Text>Spacer Test Text</Text>
      </Spacer>,
    );

    const spacer = getByText('Spacer Test Text');

    expect(spacer).toBeTruthy();
  });
});
