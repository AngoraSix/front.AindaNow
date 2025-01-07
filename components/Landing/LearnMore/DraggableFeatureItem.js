import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

export default function DraggableFeatureItem({
    feature,
    index,
    moveFeature,
    removeFeature,
    itemType,
    featuresCount,
}) {
    const { t } = useTranslation('landing');

    // useDrag
    const [{ isDragging }, dragRef] = useDrag({
        type: itemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // useDrop
    const [{ isOver }, dropRef] = useDrop({
        accept: itemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveFeature(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    // Combine refs so this Paper is both draggable and droppable
    const dragDropRef = (node) => {
        dragRef(node);
        dropRef(node);
    };

    const handleMoveUp = () => {
        if (index > 0) {
            moveFeature(index, index - 1);
        }
    };

    const handleMoveDown = () => {
        if (index < featuresCount - 1) {
            moveFeature(index, index + 1);
        }
    };

    return (
        <Paper
            className='LearnMore__FeatureItem'
            ref={dragDropRef}
            sx={{
                p: 2,
                mb: 1,
                cursor: 'move',
                backgroundColor: isDragging
                    ? 'action.hover'
                    : isOver
                        ? 'action.selected'
                        : 'background.paper',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography className='LearnMore__FeatureItem__Text' variant="body1">{t(feature.labelKey)}</Typography>
                <Box className='LearnMore__FeatureItem__Icons'>
                    {/* Up button */}
                    <IconButton
                        size="small"
                        onClick={handleMoveUp}
                        disabled={index === 0}
                    >
                        <KeyboardArrowUpIcon fontSize="small" />
                    </IconButton>

                    {/* Down button */}
                    <IconButton
                        size="small"
                        onClick={handleMoveDown}
                        disabled={index === featuresCount - 1}
                    >
                        <KeyboardArrowDownIcon fontSize="small" />
                    </IconButton>

                    {/* Delete button */}
                    <IconButton
                        onClick={() => removeFeature(feature.id)}
                        size="small"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}