import { ALL_PRODUCTIONS } from './data';

describe('ALL_PRODUCTIONS', () => {
  ALL_PRODUCTIONS.forEach(production => {
    describe(production.name, () => {
      const { requirements } = production;
      if (requirements && requirements.length > 0) {
        describe('Requirements', () => {
          production.requirements?.forEach(name => {
            describe(name, () => {
              it('should be defined', () => {
                expect(ALL_PRODUCTIONS.some(p => p.name === name)).toBeTruthy();
              });
            });
          });
        });
      }
    });
  });
});
