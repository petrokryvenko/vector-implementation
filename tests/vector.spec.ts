import { Point } from '../src/Point';
import { Vector } from '../src/Vector';

describe('Vector class', () => {
    let startPoint: Point;
    let finishPoint: Point;
    let vector: Vector;
    let vectorCoordinates: Readonly<{ x: number, y: number, z: number }>;
    beforeEach(() => {
        startPoint = new Point(-3, 5);
        finishPoint = new Point(1, 2);
        vectorCoordinates = { x: 4, y: -3, z: 0 };
        vector = new Vector(startPoint, finishPoint);
    });

    describe('property length', () => {
        it("Should calculate vector length correctly", () => {
            expect(vector.length).toBe(5);
        });
    });

    describe('property coordinates', () => {
        it("Should calculate vectors coordinates correctly", () => {
            expect(vector.coordinates).toMatchObject(vectorCoordinates);
        });
    });

    describe('method multiplyByScalarValue', () => {
        it("Should multiply vector by scalar value correctly", () => {
            const scalarValue = 2;
            const resultedVector = vector.multiplyByScalarValue(scalarValue);
            expect(resultedVector.coordinates).toMatchObject({
                x: vectorCoordinates.x * scalarValue,
                y: vectorCoordinates.y * scalarValue,
                z: vectorCoordinates.z * scalarValue
            });
        });
    });

    describe('method addVector', () => {
        it("Should add other vector correctly", () => {
            const otherVector = new Vector(new Point(0, 0, 0), new Point(1, 1, 0));
            const resultedVector = vector.addVector(otherVector);
            expect(resultedVector.coordinates).toMatchObject({
                x: vectorCoordinates.x + 1,
                y: vectorCoordinates.y + 1,
                z: vectorCoordinates.z
            });
        });
    });

    describe('method calcDotProduct', () => {
        it("Should calculate dot product correctly", () => {
            vector.startPoint.z = 1; // { 4, -3, -1 }
            const otherVector = new Vector(new Point(1, 2, 9), new Point(3, 1, 4)); // { 2, -1, -5 }
            expect(vector.calcDotProduct(otherVector)).toBe(16); // 2 * 4 + (-3)*(-1) + (-5)*(-1)
        });
    });

    describe('method calcCrossProduct', () => {
        it("Should calculate cross product correctly", () => {
            vector.startPoint.z = 1;    // { 4, -3, -1 }
            const otherVector = new Vector(new Point(1, 2, 9), new Point(3, 1, 4)); // { 2, -1, -5 }
            const crossProduct = vector.calcCrossProduct(otherVector);
            expect(crossProduct.coordinates).toMatchObject({
                x: 14,
                y: 18,
                z: 2
            });
        });
    });

    describe('method isEqual', () => {
        let otherVector : Vector;
        beforeEach(() => {
            otherVector = new Vector(new Point(3, 8, 5), new Point(7, 5, 9));
        });

        it("Vectors should be equal", () => {
            vector.startPoint.z = 1;
            vector.finishPoint.z = 5;
            expect(vector.isEqual(otherVector)).toBe(true);
        });
    
        it("Vectors should not be equal", () => {
            expect(vector.isEqual(otherVector)).toBe(false);
        });   
    });

    describe('method isOrthogonal', () => {
        let otherVector : Vector;
        beforeEach(() => {
            otherVector = new Vector(new Point(3, 8, 1), new Point(7, 5, 6));
        });
        it("Vectors should be orthogonal", () => {
            vector.finishPoint.z = -5;
            expect(vector.isOrthogonal(otherVector)).toBe(true);
        });
    
        it("Vectors should not be orthogonal", () => {
            expect(vector.isOrthogonal(otherVector)).toBe(false);
        });
    });

    describe('method isCollinear', () => {
        it("Vectors should be сollinear", () => {
           const firstVector = new Vector(new Point(2,1,4), new Point(4,1,7));
           const secondVector = new Vector(new Point(5,8,1), new Point(6,8,2.5));
           expect(firstVector.isCollinear(secondVector)).toBe(true);
        });

        it("Vectors should not be сollinear", () => {
            const firstVector = new Vector(new Point(1,1,1), new Point(4,1,7));
            const secondVector = new Vector(new Point(5,8,1), new Point(6,8,2.5));
            expect(firstVector.isCollinear(secondVector)).toBe(false);
         });
    });


});