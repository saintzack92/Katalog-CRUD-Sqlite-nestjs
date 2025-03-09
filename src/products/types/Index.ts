import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
  
  // Helper function to remove null and undefined properties recursively
  function removeNullProperties(obj: any, seen = new WeakSet()): any {
    if (obj === null || obj === undefined) return undefined;
    if (obj instanceof Date) return obj;
    if (typeof obj !== 'object') return obj;
    if (seen.has(obj)) return obj; // Prevent circular reference recursion
    seen.add(obj);
    if (Array.isArray(obj)) {
      return obj
        .map(item => removeNullProperties(item, seen))
        .filter(item => item !== undefined);
    }
    const cleaned: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = removeNullProperties(obj[key], seen);
        if (value !== null && value !== undefined) {
          cleaned[key] = value;
        }
      }
    }
    return cleaned;
  }
  
  
  
  @Injectable()
  export class CustomSerializerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => removeNullProperties(data))
      );
    }
  }
  