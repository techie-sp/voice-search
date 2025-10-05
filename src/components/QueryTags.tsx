import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tag from './Tag';
import { ParsedQuery } from '../utils/ParseVoiceQuery';



interface QueryTagsProps {
    query: ParsedQuery;
}

const QueryTags: React.FC<QueryTagsProps> = ({ query }) => {
    console.log("Rendering QueryTags with query:", query);  
    const tags: string[] = [];

    if (query.color) tags.push(query.color);
    // if (query.category) tags.push(query.category);
    if (query.brand) tags.push(query.brand);
    if (query.price) tags.push(`${query.price.operator} ${query.price.value}`);
    // if (query.keywords?.length) tags.push(...query.keywords);

    return (
        <View style={styles.container}>
            {tags.map((tag, index) => (
                <Tag key={index} label={tag} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 8,
    },
});

export default QueryTags;
