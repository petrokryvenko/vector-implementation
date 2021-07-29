import { Point } from './Point';

export class Vector {
    constructor(public startPoint: Point, public finishPoint: Point) { }

    get length(): number {
        return Math.sqrt((this.finishPoint.x - this.startPoint.x) ** 2 + (this.finishPoint.y - this.startPoint.y) ** 2 + (this.finishPoint.z - this.startPoint.z) ** 2);
    }

    get coordinates(): Readonly<{ x: number, y: number, z: number }> {
        return {
            x: this.finishPoint.x - this.startPoint.x,
            y: this.finishPoint.y - this.startPoint.y,
            z: this.finishPoint.z - this.startPoint.z
        };
    }

    multiplyByScalarValue(value: number): Vector {
        const multipliedStartPoint = new Point(...this.startPoint.coordinates.map((coord: number): number => coord * value));
        const multipliedFinishedPoint = new Point(...this.finishPoint.coordinates.map((coord: number): number => coord * value));
        return new Vector(multipliedStartPoint, multipliedFinishedPoint);
    }

    addVector(otherVector: Vector): Vector {
        const resultedStartPoint = new Point(this.startPoint.x + otherVector.startPoint.x, this.startPoint.y + otherVector.startPoint.y, this.startPoint.z + otherVector.startPoint.z);
        const resultedFinishPoint = new Point(this.finishPoint.x + otherVector.finishPoint.x, this.finishPoint.y + otherVector.finishPoint.y, this.finishPoint.z + otherVector.finishPoint.z);
        return new Vector(resultedStartPoint, resultedFinishPoint);
    }

    calcDotProduct(otherVector: Vector): number {
        const thisVectorCoordinates = this.coordinates;
        const otherVectorCoordinates = otherVector.coordinates;
        return thisVectorCoordinates.x * otherVectorCoordinates.x + thisVectorCoordinates.y * otherVectorCoordinates.y + thisVectorCoordinates.z * otherVectorCoordinates.z;
    }

    calcCrossProduct(otherVector: Vector): Vector {
        const thisVectorCoordinates = this.coordinates;
        const otherVectorCoordinates = otherVector.coordinates;
        const resultedCooredinates = [
            thisVectorCoordinates.y * otherVectorCoordinates.z - thisVectorCoordinates.z * otherVectorCoordinates.y,
            thisVectorCoordinates.z * otherVectorCoordinates.x - thisVectorCoordinates.x * otherVectorCoordinates.z,
            thisVectorCoordinates.x * otherVectorCoordinates.y - thisVectorCoordinates.y * otherVectorCoordinates.x,
        ] as const;
        return new Vector(new Point(0, 0, 0), new Point(...resultedCooredinates));
    }

    isEqual(otherVector: Vector): boolean {
        const thisVectorCoordinates = this.coordinates;
        const otherVectorCoordinates = otherVector.coordinates;
        return thisVectorCoordinates.x === otherVectorCoordinates.x && thisVectorCoordinates.y === otherVectorCoordinates.y && thisVectorCoordinates.z === otherVectorCoordinates.z;
    }

    isOrthogonal(otherVector: Vector): boolean {
        return this.calcDotProduct(otherVector) === 0;
    }

    isCollinear(otherVector: Vector): boolean {
        const crossProduct = this.calcCrossProduct(otherVector);
        return crossProduct.isEqual(new Vector(new Point(0, 0, 0), new Point(0, 0, 0)));
    }
}