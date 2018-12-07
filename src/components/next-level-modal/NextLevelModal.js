import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  startLevel
} from '../../redux/level-progress/levelProgressActions';
import {
  winGame
} from '../../redux/game-progress/gameProgressActions';
import levelConfigs from '../../level-configs/levelConfigs';

const TextBlock = styled.div`
  position: fixed;
  color: white;
  width: 80%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #000000;
  text-align: center;
`;

const enhance = compose(
  withRouter,
  connect(
    null,
    (dispatch, { history }) => ({
      startNextLevel: (currentLevel) => () => {
        const nextLevel = currentLevel + 1;
        const isFinalLevel = nextLevel % levelConfigs.length === 0;
        if (isFinalLevel) {
          dispatch(winGame());
        } else {
          dispatch(startLevel());
          history.push(`/${nextLevel}`);
        }

      }
    })
  )
);

const NextLevelModalPure = (props) => {
  const {
    match,
    startNextLevel
  } = props;

  const currentLevel = parseInt(match.params.level, 10) || 0;

  return (
    <div className='NextLevelModal'>
      <section className='NextLevelModal__modal-main'>
        <TextBlock>
          <button onClick={startNextLevel(currentLevel)}>Next Level</button>
        </TextBlock>
      </section>
    </div>
  );
};

const NextLevelModal = enhance(NextLevelModalPure);
export default NextLevelModal;
