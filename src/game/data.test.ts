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
      it('should have no duplicate', () => {
        expect(new Set(requirements.map(r => r.name)).size).toBe(requirements.length);
      });
      requirements.forEach(r => {
        describe(r.name, () => {
          it('should be defined', () => {
            expect(ALL_PRODUCTIONS.some(p => p.name === r.name)).toBeTruthy();
          });
          describe('Count', () => {
            it('should be positive', () => {
              expect(r.count > 0).toBeTruthy();
            });
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
