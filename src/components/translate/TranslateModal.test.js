import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, fireEvent } from '@testing-library/react';

// The component AND the query need to be exported
import TranslateModal from './TranslateModal';
import { TRANSLATED_QUESTION } from '../gql/queries/Question';

const generateMocked = data => [
  {
    request: {
      query: TRANSLATED_QUESTION,
    },
    result: {
      data,
    },
  },
];

describe('<TranslateModal />', () => {
  let findByText, findByTestId;
  beforeEach(() => {
    const mockedData = {
      translatedQuestion: {
        questionText: 'Hello',
        translatedQuestionText: 'Hola',
        questionOptions: [],
      },
    };
    const mocks = generateMocked(mockedData);
    ({ findByText, findByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TranslateModal />
      </MockedProvider>
    ));
  });

  it('initially renders as a button', async () => {
    const result = await findByText('Spanish Translation');
    expect(result.nodeName).toEqual('SPAN');
  });

  it('translates the question when the translate button is clicked', async () => {
    const button = await findByTestId('translate-button');
    fireEvent.click(button);
    const translation = await findByText('Hola');
    expect(translation).toBeTruthy();
  });
});
