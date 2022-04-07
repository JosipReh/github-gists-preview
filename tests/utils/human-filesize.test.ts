import {humanFileSize} from "../../src/utils/human-filesize";

describe('humanFileSize', () => {
    describe('SI units enabled 1 decimal', () => {
       it('should return correct value under threshold', () => {
           const bytes = 800;

           const result = humanFileSize(bytes, true);

           expect(result).toBe('800 B');
       });
        it('should return correct value for above threshold', () => {
            const bytes = 1025;

            const result = humanFileSize(bytes, true);

            expect(result).toBe('1.0 kB');
        })
    });

    describe('SI units enabled 2 decimal', () => {
        it('should return correct value under threshold', () => {
            const bytes = 800;

            const result = humanFileSize(bytes, true, 2);

            expect(result).toBe('800 B');
        });
        it('should return correct value for above threshold', () => {
            const bytes = 1025;

            const result = humanFileSize(bytes, true, 2);

            expect(result).toBe('1.02 kB');
        })
    });

    describe('SI units disabled 1 decimal', () => {
        it('should return correct value under threshold', () => {
            const bytes = 800;

            const result = humanFileSize(bytes, false);

            expect(result).toBe('800 B');
        });
        it('should return correct value for above threshold', () => {
            const bytes = 1025;

            const result = humanFileSize(bytes, false);

            expect(result).toBe('1.0 KiB');
        })
    });

    describe('SI units disabled 2 decimals', () => {
        it('should return correct value under threshold', () => {
            const bytes = 800;

            const result = humanFileSize(bytes, false,2);

            expect(result).toBe('800 B');
        });
        it('should return correct value for above threshold', () => {
            const bytes = 1025;

            const result = humanFileSize(bytes, false, 2);

            expect(result).toBe('1.00 KiB');
        })
    });
});
