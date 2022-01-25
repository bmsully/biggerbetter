import React, { Component, useState, useEffect } from "react";
import ItemCard from "./ItemCard.js";
import ProfileCard from "./ProfileCard.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Fade from "react-bootstrap/Fade";

import "../../utilities.css";
import "./TradeModule.css";

import { get } from "../../utilities.js";

/**
 * TradeModule is a component that creates new trades
 *
 * @param {String} userId is the id of the active user
 * @param {String} username is the name of the active user
 * @param {Object} tradeInfo contains the user and their items being proposed to
 * @param {function} toggle toggles the trade module
 * @param {function} onSubmit posts a trade with selected items
 */
const TradeModule = (props) => {
  const [otherSelected, setOtherSelected] = useState(null); //other user's item selection
  const [userSelected, setUserSelected] = useState(null); //active user's item selection
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get("/api/items", { userid: props.userId }).then((items) => setUserItems(items));
  }, []);

  const closeTradeModule = () => {
    setOtherSelected(null);
    setUserSelected(null);
    props.toggle();
  };

  const confirmTrade = () => {
    setLoading(true);
    const query = { proposerid: props.userId, approverid: props.tradeInfo.user.id };
    get("/api/trades", query).then((tradeObj) => {
      const trades = tradeObj;
      if (trades.length === 0) {
        const trade = {
          proposer: {
            userid: props.userId,
            name: props.username,
            item: userSelected,
          },
          approver: {
            userid: props.tradeInfo.user.id,
            name: props.tradeInfo.user.name,
            item: otherSelected,
          },
        };
        setLoading(false);
        props.onSubmit(trade);
        const message = `You have submitted the following trade:\nYou recieve ${otherSelected.name} from ${props.tradeInfo.user.name}.\n${props.tradeInfo.user.name} recieves ${userSelected.name} from you.`;
        alert(message);
        closeTradeModule();
      } else {
        for (const tradeObj of trades) {
          if (
            tradeObj.proposer.item.itemid === userSelected._id &&
            tradeObj.approver.item.itemid === otherSelected._id
          ) {
            setLoading(false);
            const message = "You have proposed this trade before.\nPlease select different items.";
            alert(message);
            break;
          } else if (
            tradeObj.proposer.item.itemid === otherSelected._id &&
            tradeObj.approver.item.itemid === userSelected._id
          ) {
            setLoading(false);
            const message = `${props.tradeInfo.user.name} has proposed this trade before\nPlease select different items.`;
            alert(message);
            break;
          } else {
            const trade = {
              proposer: {
                userid: props.userId,
                name: props.username,
                item: userSelected,
              },
              approver: {
                userid: props.tradeInfo.user._id,
                name: props.tradeInfo.user.name,
                item: otherSelected,
              },
            };
            setLoading(false);
            props.onSubmit(trade);
            const message = `You have submitted the following trade:\nYou recieve ${otherSelected.name} from ${props.tradeInfo.user.name}.\n${props.tradeInfo.user.name} recieves ${userSelected.name} from you.`;
            alert(message);
            closeTradeModule();
            break;
          }
        }
      }
    });
  };

  let otherItems = null;
  const otherHasItems = props.tradeInfo.items.length !== 0;
  if (otherHasItems) {
    const tempOtherItems = props.tradeInfo.items.filter((itemObj) => itemObj.active);
    if (tempOtherItems.length === 0) {
      otherItems = <div>User has no active items :(</div>;
    } else {
      otherItems = tempOtherItems.map((itemObj) => (
        <div key={`UserItem_${itemObj._id}`}>
          <ItemCard
            userId={props.userId}
            itemid={itemObj._id}
            userid={props.tradeInfo.user._id}
            name={itemObj.name}
            desc={itemObj.desc}
            img_loc={itemObj.img_loc}
          />
          <div className="u-flex u-flex-justifyCenter">
            <Button
              className="TradeModule-btn"
              variant="outline-primary"
              onClick={() => setOtherSelected(itemObj)}
            >
              Select this item
            </Button>
          </div>
          <hr />
        </div>
      ));
    }
  } else {
    otherItems = <div>User has no items :(</div>;
  }

  let myItems = null;
  const userHasItems = userItems.length !== 0;
  if (userHasItems) {
    const tempMyItems = userItems.filter((itemObj) => itemObj.active);
    if (tempMyItems.length === 0) {
      myItems = <div>You have no active items to trade</div>;
    } else {
      myItems = tempMyItems.map((itemObj) => (
        <div key={`MyItem_${itemObj._id}`}>
          <ItemCard
            userId={props.userId}
            itemid={itemObj._id}
            userid={itemObj.userid}
            name={itemObj.name}
            desc={itemObj.desc}
            img_loc={itemObj.img_loc}
          />
          <div className="u-flex u-flex-justifyCenter">
            <Button
              className="TradeModule-btn"
              variant="outline-primary"
              onClick={() => setUserSelected(itemObj)}
            >
              Select this item
            </Button>
          </div>
          <hr />
        </div>
      ));
    }
  } else {
    myItems = <div>You must add items to trade!</div>;
  }

  let content = <div>Loading!</div>;
  if (loading) {
    content = (
      <>
        <div>Loading!</div>
      </>
    );
  } else if (!otherSelected) {
    //display other user's profile and items
    content = (
      <>
        <Fade in={otherSelected === null}>
          <div id="first-fade">
            <ProfileCard
              username={props.tradeInfo.user.name}
              usertarget={props.tradeInfo.user.target}
              userimg_loc={props.tradeInfo.user.img_loc}
            />
            <h4 className="u-headerFont">Select one of {props.tradeInfo.user.name}'s items</h4>
            {otherItems}
          </div>
        </Fade>
      </>
    );
  } else if (otherSelected && !userSelected) {
    //display selected item and active user's items
    content = (
      <>
        <Fade in={otherSelected !== null && userSelected === null}>
          <div id="second-fade">
            <h4 className="u-headerFont">{props.tradeInfo.user.name}'s item</h4>
            <ItemCard
              userId={props.userId}
              itemid={otherSelected._id}
              userid={props.tradeInfo.user._id}
              name={otherSelected.name}
              desc={otherSelected.desc}
              img_loc={otherSelected.img_loc}
            />
            <div className="u-flex u-flex-justifyCenter">
              <Button
                className="TradeModule-btn"
                variant="outline-secondary"
                onClick={() => setOtherSelected(null)}
              >
                De-select this item
              </Button>
            </div>
            <hr className="TradeModule-hr" />
            <h4 className="u-headerFont">Select one of your items</h4>
            {myItems}
          </div>
        </Fade>
      </>
    );
  } else {
    //display both selected items and confirm trade Button
    content = (
      <>
        <Fade in={otherSelected !== null && userSelected !== null}>
          <div id="third-fade">
            <h4 className="u-headerFont">{props.tradeInfo.user.name}'s item</h4>
            <ItemCard
              userId={props.userId}
              itemid={otherSelected._id}
              userid={props.tradeInfo.user._id}
              name={otherSelected.name}
              desc={otherSelected.desc}
              img_loc={otherSelected.img_loc}
            />
            <hr className="TradeModule-hr" />
            <hr className="TradeModule-hr" />
            <h4 className="u-headerFont">Your item</h4>
            <ItemCard
              userId={props.userId}
              itemid={userSelected._id}
              userid={props.userId}
              name={userSelected.name}
              desc={userSelected.desc}
              img_loc={userSelected.img_loc}
            />
            <div className="u-flex u-flex-justifyCenter">
              <Button
                className="TradeModule-btn"
                variant="outline-secondary"
                onClick={() => setUserSelected(null)}
              >
                De-select this item
              </Button>
              <Button className="TradeModule-btn" variant="success" onClick={() => confirmTrade()}>
                Request trade!
              </Button>
            </div>
          </div>
        </Fade>
      </>
    );
  }

  return (
    <Modal show={props.tradingVisible} backdrop="static" onHide={closeTradeModule}>
      <Modal.Header className="u-headerFont" closeButton>
        <Modal.Title>Trade Module</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
};

export default TradeModule;

/**
 * Note on trade module process
 *
 * Opens on user's profile Card and Items
 * Get request to items(userId)
 * Each item has select button, user selects one
 * (profile card disappears, other items disappear)
 * User's items appear (user must have items)
 * User then selects one item (their other items disappear)
 * User hits submit
 * Check if selected trade exists or has been made before
 * ^ this is performed via get request to trades(proposer:userId, approver:userId and vice versa)
 * User alerted if failure (trade exists) or success (post request of trade)
 */
