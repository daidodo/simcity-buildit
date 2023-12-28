import {
  ALL_PRODUCERES,
  ALL_PRODUCTIONS,
} from './data';
import { ProductionData } from './types';

describe('ALL_PRODUCTIONS', () => {
  ALL_PRODUCTIONS.forEach(production => {
    describe(production.name, () => {
      testProduction(production);
    });
  });
});

function testProduction(production: ProductionData) {
  const { requirements } = production;
  if (requirements && requirements.length > 0) {
    describe('Requirements', () => {
      [...new Set(requirements)].forEach(name => {
        describe(name, () => {
          it('should be defined', () => {
            expect(ALL_PRODUCTIONS.some(p => p.name === name)).toBeTruthy();
          });
        });
      });
    });
  }
  describe('Time', () => {
    it('should be positive', () => {
      expect(production.time > 0).toBeTruthy();
    });
  });
  describe('Producer', () => {
    it('should be defined', () => {
      expect(ALL_PRODUCERES.some(p => p.name === production.producer)).toBeTruthy();
    });
  });
}
