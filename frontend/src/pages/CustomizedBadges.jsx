import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//we remove <BadgeProps> 
// const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CustomizedBadges({ Quantity }) {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={Quantity} color="secondary">
        {/* <StyledBadge  badgeContent={Number.isNaN(Quantity) ? 0 : Quantity} color="secondary"> */}
        {console.log(typeof(Quantity)) }
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}


