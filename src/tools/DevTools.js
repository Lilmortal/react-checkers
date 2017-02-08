import React from 'react';

import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <FilterMonitor blacklist={['@@redux-form', 'draught/UPDATE_BOARD', 'tile/UPDATE_BOARD', 'board/UPDATE_BOARD', 'draught/START_SELECT_DRAUGHT',
  'tile/START_MOVE_DRAUGHT']}>
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 defaultIsVisible={true}>
      <LogMonitor theme='tomorrow' />
    </DockMonitor>
  </FilterMonitor>
);

export default DevTools;
