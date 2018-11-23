import React from 'react';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';

class World extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeLevelIndex: 0
    };
  }

  render() {
    const { activeLevelIndex } = this.state;

    const activeLevelConfig = levelConfigs[activeLevelIndex];

    const onLevelUp = () => {
      this.setState((state) => ({
        activeLevelIndex: (state.activeLevelIndex + 1) % levelConfigs.length
      }));
    };

    const ActiveLevel = () => (
      <Level {...activeLevelConfig} onLevelUp={onLevelUp} />
    );

    const styleProps = {
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black'
    };

    return (
      <div className='World' style={styleProps}>
        <ActiveLevel/>
      </div>
    );
  }
}

export default World;
