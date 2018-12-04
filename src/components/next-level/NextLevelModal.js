import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const TextBlock = styled.div`
  position:fixed;
  color: white;
  width: 80%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  background: #000000;
  text-align: center;
`;

const NextLevelModal = ({ nextLevel, show, children } ) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <TextBlock>
          {children}
          <button onClick={nextLevel}>Next Level</button>
        </TextBlock>
      </section>
    </div>
  );
}


export default NextLevelModal;
