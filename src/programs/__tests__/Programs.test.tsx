import React from 'react';
import Programs from '../pages/Programs';
import withProviders from '../../components/withProviders';
import { authInitialState } from '../../auth';
import { renderWithRedux } from '../../utils/test-utils';

const timezone = 'Europe/Berlin';
const mockPrograms = [
  {
    id: 1,
    type: 'programme',
    title: 'Live better with irritable bowel syndrome',
    image:
      'https://res.cloudinary.com/cara-care/image/upload/production/programmes/programmes/Bildschirmfoto_2019-12-11_um_16.03.57.png',
    duration: '12 weeks',
    started: '2019-04-15T00:00:00Z',
    video: '',
    videoDuration: 0.0,
    videoCaptions: '',
  },
  {
    id: 2,
    type: 'programme',
    title: 'test program',
    image: '',
    duration: '8 weeks',
    started: '2020-06-12T00:00:00Z',
    video: '',
    videoDuration: 0.0,
    videoCaptions: '',
  },
];

describe('<Programs />', () => {
  it('shows a message when patient is not enrolled in programs', () => {
    const ProgramWithProviders = withProviders(Programs);
    const { getByText } = renderWithRedux(<ProgramWithProviders />, {
      preloadedState: {
        auth: {
          ...authInitialState,
          patientId: 1,
        },
      },
    });
    expect(getByText(/not enrolled in any programs/i)).toHaveTextContent(
      'Patient is not enrolled in any programs.'
    );
  });

  it("shows patient's enrolled programs", () => {
    const ProgramWithProviders = withProviders(Programs);
    const { getByText, getAllByText } = renderWithRedux(
      <ProgramWithProviders />,
      {
        preloadedState: {
          auth: {
            ...authInitialState,
            patientId: 1,
            patientTimezone: timezone,
            patientEnrolledPrograms: mockPrograms,
          },
        },
      }
    );
    mockPrograms.forEach((program) => {
      expect(getByText(program.title)).toBeVisible();
    });
    expect(getAllByText(new RegExp(timezone, 'i'))).toHaveLength(2);
  });
});
