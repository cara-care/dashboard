import { build, sequence, fake, oneOf } from '@jackfranklin/test-data-bot';
import { Submission } from './questionnairesReducer';
import { FieldTypes } from './components/Field';

export const submissionFieldBuilder = build<{
  id: string;
  name: string;
  type: FieldTypes;
  value: any;
}>('Field', {
  fields: {
    id: fake((f) => f.random.uuid()),
    name: fake((f) => f.lorem.word()),
    type: oneOf(
      FieldTypes.char,
      FieldTypes.date,
      FieldTypes.file,
      FieldTypes.integer,
      FieldTypes.multiple_choice,
      FieldTypes.scale,
      FieldTypes.single_choice,
      FieldTypes.text,
      FieldTypes.info
    ),
    value: null,
  },
  // TODO: https://github.com/jackfranklin/test-data-bot#traits-new-in-v13
  // postBuild: (field) => ({
  //   ...field,
  // }),
});

export const submissionGroupBuilder = build('Group', {
  fields: {
    name: fake((f) => f.lorem.word()),
    fields: fake((f) => Array(15).fill(undefined).map(submissionFieldBuilder)),
  },
});

export const submissionBuilder = build<
  Submission & {
    scoreSSS: number;
    scoreQOL: number;
    groups: any[];
  }
>('Submission', {
  fields: {
    id: sequence(),
    name: fake((f) => f.lorem.word()),
    started: fake((f) => f.date.past()),
    completed: fake((f) => f.date.recent()),
    scoreSSS: fake((f) => f.random.number({ min: 0, max: 500 })),
    scoreQOL: fake((f) => f.random.number({ min: 0, max: 100 })),
    groups: Array(5).fill(undefined).map(submissionGroupBuilder),
  },
});

export const mockResult = {
  count: 1,
  previous: null,
  next: null,
  results: [submissionBuilder()],
};
