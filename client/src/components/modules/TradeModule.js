import React, { Component, useState, useEffect } from "react";
import ItemCard from "./ItemCard.js";
import ProfileCard from "./ProfileCard.js";
import tempItemPic from "../../public/temp-item.png";

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
  const [trades, setTrades] = useState([]);
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
    get("/api/trades", query)
      .then((tradeObj) => setTrades(tradeObj))
      .then(() => {
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
              const message =
                "You have proposed this trade before.\nPlease select different items.";
              alert(message);
            } else if (
              tradeObj.proposer.item.itemid === otherSelected._id &&
              tradeObj.approver.item.itemid === userSelected._id
            ) {
              setLoading(false);
              const message = `${props.tradeInfo.user.name} has proposed this trade before\nPlease select different items.`;
              alert(message);
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
          <button onClick={() => setOtherSelected(itemObj)}>Select this item</button>
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
          <button onClick={() => setUserSelected(itemObj)}>Select this item</button>
        </div>
      ));
    }
  } else {
    myItems = <div>You must add items to trade!</div>;
  }

  if (loading) {
    return (
      <>
        <h3>Trade Module</h3>
        <div>Loading!</div>
        <hr />
      </>
    );
  } else if (!otherSelected) {
    //display other user's profile and items
    return (
      <>
        <h3>Trade Module</h3>
        <button onClick={() => closeTradeModule()}> Go back </button>
        <ProfileCard
          username={props.tradeInfo.user.name}
          usertarget={props.tradeInfo.user.target}
          userimg_loc={props.tradeInfo.user.img_loc}
        />
        <h4>Select one of {props.tradeInfo.user.name}'s items</h4>
        {otherItems}
        <hr />
      </>
    );
  } else if (otherSelected && !userSelected) {
    //display selected item and active user's items
    return (
      <>
        <h3>Trade Module</h3>
        <button onClick={() => closeTradeModule()}> Go back </button>
        <h4>{props.tradeInfo.user.name}'s item</h4>
        <ItemCard
          userId={props.userId}
          itemid={otherSelected._id}
          userid={props.tradeInfo.user._id}
          name={otherSelected.name}
          desc={otherSelected.desc}
          img_loc={otherSelected.img_loc}
        />
        <button onClick={() => setOtherSelected(null)}>De-select this item</button>
        <h4>Select one of your items</h4>
        {myItems}
        <hr />
      </>
    );
  } else {
    //display both selected items and confirm trade button
    return (
      <>
        <h3>Trade Module</h3>
        <button onClick={() => closeTradeModule()}> Go back </button>
        <h4>{props.tradeInfo.user.name}'s item</h4>
        <ItemCard
          userId={props.userId}
          itemid={otherSelected._id}
          userid={props.tradeInfo.user._id}
          name={otherSelected.name}
          desc={otherSelected.desc}
          img_loc={otherSelected.img_loc}
        />
        <h4>Your item</h4>
        <ItemCard
          userId={props.userId}
          itemid={userSelected._id}
          userid={props.userId}
          name={userSelected.name}
          desc={userSelected.desc}
          img_loc={userSelected.img_loc}
        />
        <button onClick={() => setUserSelected(null)}>De-select this item</button>
        <button onClick={() => confirmTrade()}>Confirm trade!</button>
        <hr />
      </>
    );
  }
};

export default TradeModule;

/**
 * Note on trade module process
 *
 * Opens on user's profile Card and Items
 * Get request to items(userId) and to trades(proposer:userId, approver:userId and vice versa)
 * Each item has select button, user selects one
 * (profile card disappears, other items disappear)
 * User's items appear (user must have items)
 * User then selects one item (their other items disappear)
 * Check if selected trade exists or has been made before
 * Otherwise, confirm button appears (post request)
 */

//TODO:
//Fill in api for adding a trade
//Sort function to make sure the trade is legal/valid
//Testing!!

//Trades page:
//Sort into various pages
//Create control for managing trades (approve/deny)
//Create control for completing trades (switch/keep for self)
//Create messaging system (socket)

//Create some initial styling!

//Deploy!
