// import * as React from 'react';
import { ReactNode } from 'react';
import { BackendFactory, DragDropManager } from 'dnd-core';

export type MyDndProviderProps<BackendContext, BackendOptions> = {
    manager: DragDropManager;
} | {
    backend: BackendFactory;
    context?: BackendContext;
    options?: BackendOptions;
    debugMode?: boolean;
    children?: ReactNode;
};
/**
 * A React component that provides the React-DnD context
 */
// export  const MyDndProvider: React.FC<MyDndProviderProps<any, any>>;
