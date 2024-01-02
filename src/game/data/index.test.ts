import {
  ALL_PRODUCERES,
  ALL_PRODUCTS,
} from './';
import { ProductData } from './types';

describe('ALL_PRODUCTIONS', () => {
  ALL_PRODUCTS.forEach(production => {
    describe(production.name, () => {
      testProduction(production);
    });
  });
});

function testProduction(production: ProductData) {
  const { deps } = production;
  if (deps && deps.length > 0) {
    describe('Requirements', () => {
      it('should have no duplicate', () => {
        expect(new Set(deps.map(r => r.name)).size).toBe(deps.length);
      });
      deps.forEach(r => {
        describe(r.name, () => {
          it('should be defined', () => {
            expect(ALL_PRODUCTS.some(p => p.name === r.name)).toBeTruthy();
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
