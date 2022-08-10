import { removeLineItem } from '@shopify/app-bridge/actions/Cart'
import {
  ResourceItem,
  Thumbnail,Icon
} from '@shopify/polaris'
import React from 'react'
import styles from './CollectionsList.module.css'
import { CircleCancelMajor } from '@shopify/polaris-icons'

const CollectionsProduct = ({ item, removeItem }) => {
  const { lastName } = item
  // const media = (
  //   <Thumbnail source={img} size="medium" />
  // )
  return (
    <div className={styles.container}>
      <ResourceItem id={lastName} media={media}>
        <div className={styles.itemContainer}>
          {lastName}
          <button
            className={styles.btn}
            onClick={() => {
              removeItem(lastName)
            }}
          >
            <Icon
              source={CircleCancelMajor}
              color="base"
            />
          </button>
        </div>
      </ResourceItem>
    </div>
  )
}

export default CollectionsProduct
